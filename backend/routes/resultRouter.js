
//   module.exports = router;
const express = require("express");
const router = express.Router();
const knex = require("../knex-config");
const cors = require("cors");

router.get("/cities/circles/voted-count", async (req, res) => {
  try {
    // Query to get the count of unique users who have voted in each circle within a city
    const votedCounts = await knex("users")
      .select("city", "circle")
      .countDistinct("national_id as voted_count") // Count distinct national_id (unique users) who have voted
      .where("isVotedcircle", true) // Filter to include only users who have voted in the circle
      .groupBy("city", "circle") // Group by city and circle
      .orderBy(["city", "circle"]); // Order by city and circle

    res.json(votedCounts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error retrieving voted count per city and circle" });
  }
});

router.get("/candidates/similar", async (req, res) => {
  try {
    // استعلام مباشر لقاعدة البيانات للحصول على بيانات التصويت لكل مدينة ودائرة
    const cityCircleVotes = await knex("users")
      .select("city", "circle")
      .countDistinct("national_id as voted_count") // Count distinct national_id (unique users) who have voted
      .where("isVotedcircle", true) // Filter to include only users who have voted in the circle
      .groupBy("city", "circle") // Group by city and circle
      .orderBy(["city", "circle"]);

    // إنشاء خريطة للأصوات
    const cityCircleVoteMap = cityCircleVotes.reduce((acc, item) => {
      const key = `${item.city}-${item.circle}`;
      acc[key] = item.voted_count;
      return acc;
    }, {});

    // استعلام المرشحين المتشابهين
    const similarCandidates = await knex("candidates")
      .select("list", "city", "circle", "list_votes")
      .whereNotNull("list")
      .groupBy("list", "city", "circle", "list_votes")
      .having(knex.raw("COUNT(*)"), ">", 1)
      .orderBy("list");

      const districtDivisionRules = {
        "عمان": 7,
        "الزرقاء": 10,
      };

    // حساب العتبة بناءً على البيانات المستردة
    //   const resultsWithThreshold = similarCandidates.map(candidate => {
    //     const key = `${candidate.city}-${candidate.circle}-${candidate.list}`;
    //     const totalVotes = cityCircleVoteMap[key] || 0;
    //     const threshold = totalVotes * 0.07;
    //     const divisionRule = districtDivisionRules[candidate.city] || 1;
    //     const seatWeight = totalVotes / divisionRule;
    //     const status = candidate.list_votes > threshold ? 'pass' : 'fail';
    //     const listWeight = seatWeight > 0 ? candidate.list_votes / seatWeight : 0;

    const resultsWithThreshold = similarCandidates.map((candidate) => {
      const key = `${candidate.city}-${candidate.circle}-${candidate.list}  `;
      const totalVotes = cityCircleVoteMap[key] || 0;
      const threshold = 100 * 0.07;
      // const divisionRule = districtDivisionRules[candidate.city] || 1;
      const divisionRule = districtDivisionRules[candidate.city] || 1;
      // const seatWeight = 100 / 7;
      const seatWeight = 100 / divisionRule;
      const status = candidate.list_votes > threshold ? "pass" : "fail";
      const listWeight = seatWeight > 0 ? candidate.list_votes / seatWeight : 0;

      ///  افصل الديسيمال عن الاعداد
      // افصل الديسيمال عن الأعداد
      const wholeNumberSeat = Math.floor(listWeight);
      const decimalPartSeat = listWeight - wholeNumberSeat;

      return {
        ...candidate,
        threshold,
        totalVotes,
        status,
        seatWeight,
        listWeight,
        wholeNumberSeat,
        decimalPartSeat,
      };
    });

    // تجميع المرشحين حسب المدينة والدائرة
    const groupedCandidates = resultsWithThreshold.reduce((acc, candidate) => {
      const key = `${candidate.city}-${candidate.circle}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(candidate);
      return acc;
    }, {});

    const finalResults = Object.entries(groupedCandidates).map(
      // const totalSeats = districtDivisionRules[city] || 0; // Adjust totalSeats based on the city
      ([key, candidates]) => {
        const [city, circle] = key.split("-");
        const totalSeats = districtDivisionRules[city] || 0; 


        // const totalSeats = 7; // Adjust based on your requirements
        let remainingSeats = totalSeats;

        // Filter out candidates with 'fail' status
        const passingCandidates = candidates.filter(
          (candidate) => candidate.status === "pass"
        );

        // Distribute seats to passing candidates based on whole number
        passingCandidates.forEach((candidate) => {
          candidate.allocatedSeats = Math.min(
            candidate.wholeNumberSeat,
            remainingSeats
          );
          remainingSeats -= candidate.allocatedSeats;
        });

        // Distribute remaining seats to passing candidates based on decimal part
        if (remainingSeats > 0) {
          const sortedByDecimal = [...passingCandidates].sort(
            (a, b) => b.decimalPartSeat - a.decimalPartSeat
          );
          for (let i = 0; i < remainingSeats; i++) {
            if (sortedByDecimal[i]) {
              sortedByDecimal[i].allocatedSeats += 1;
            }
          }
          remainingSeats = 0; // All seats are now allocated
        }

        //  remaining seats to failing candidates
        if (remainingSeats > 0) {
          const sortedByDecimalFails = [...failingCandidates].sort(
            (a, b) => b.decimalPartSeat - a.decimalPartSeat
          );
          for (let i = 0; i < remainingSeats; i++) {
            if (sortedByDecimalFails[i]) {
              sortedByDecimalFails[i].allocatedSeats += 1;
            }
          }
        }

        return {
          city,
          circle,
          totalSeats,
          passingCandidates: passingCandidates.map(
            ({
              list,
              allocatedSeats,
              listWeight,
              wholeNumberSeat,
              decimalPartSeat,
              list_votes,
              threshold,
              status,
            }) => ({
              list,
              allocatedSeats,
              listWeight,
              wholeNumberSeat,
              decimalPartSeat,
              list_votes,
              threshold,
              status,
            })
          ),
        };
      }
    );

    res.json(finalResults);

    // بصفحة الداشبورد والهوم  بنسترجعهم من هون
    await Promise.all(
      finalResults.map(async (entry) => {
        await knex("candidates")
          .whereIn(
            "list",
            entry.passingCandidates.map((candidate) => candidate.list)
          )
          .andWhere({ city: entry.city, circle: entry.circle })
          .update({ isPass: true });
      })
    );

    // Update totalSeats for each list in the candidates table
    await Promise.all(
      finalResults.map(async (entry) => {
        await Promise.all(
          entry.passingCandidates.map(async (candidate) => {
            await knex("candidates")
              .whereIn(
                "list",
                entry.passingCandidates.map((candidate) => candidate.list)
              )
              .update({ totalSeats: candidate.allocatedSeats });
          })
        );
      })
    );

    // function to retriave data

    function logPassingCandidates(data) {
      data.forEach((entry) => {
        console.log(`City: ${entry.city}`);
        if (entry.passingCandidates.length > 0) {
          console.log("Passing Candidates:");
          entry.passingCandidates.forEach((candidate) => {
            console.log(`  List: ${candidate.list}`);
            console.log(`  Allocated Seats: ${candidate.allocatedSeats}`);
            console.log(`  List Weight: ${candidate.listWeight}`);
            console.log(`  Whole Number Seat: ${candidate.wholeNumberSeat}`);
            console.log(`  Decimal Part Seat: ${candidate.decimalPartSeat}`);
            console.log(`  List Votes: ${candidate.list_votes}`);
            console.log(`  Threshold: ${candidate.threshold}`);
            console.log(`  Status: ${candidate.status}`);
          });
        } else {
          console.log("No passing candidates.");
        }
        console.log();
      });
    }
    // بس استدعي اسم الفنكشن بالداش بجيب الداتا
    logPassingCandidates(finalResults);

    //   function logFallingCandidates(data) {
    //     data.forEach(entry => {
    //       console.log(`City: ${entry.city}`);
    //       if (entry.failingCandidates.length > 0) {
    //         console.log("Failing Candidates:");
    //         entry.failingCandidates.forEach(candidate => {
    //           console.log(`  List: ${candidate.list}`);
    //           console.log(`  Allocated Seats: ${candidate.allocatedSeats}`);
    //           console.log(`  List Weight: ${candidate.listWeight}`);
    //           console.log(`  Whole Number Seat: ${candidate.wholeNumberSeat}`);
    //           console.log(`  Decimal Part Seat: ${candidate.decimalPartSeat}`);
    //           console.log(`  List Votes: ${candidate.list_votes}`);
    //           console.log(`  Threshold: ${candidate.threshold}`);
    //           console.log(`  Status: ${candidate.status}`);
    //         });
    //       } else {
    //         console.log("No failing candidates.");
    //       }
    //       console.log(); // Adds a blank line for readability
    //     });
    //   }

    //   // للداش بورد
    //   logFallingCandidates(finalResults);

    // Send the response with the final results
  } catch (err) {
    res.status(500).json({ error: "Error retrieving similar candidates" });
  }
});

router.get("/candidates/passed", async (req, res) => {
  try {
    // Retrieve candidates marked as passed, excluding types كوتا and مسيحي
    const passedCandidates = await knex("candidates")
      .select(
        "id",
        "name",
        "city",
        "circle",
        "list",
        "candidate_votes",
        "totalSeats",
        "type"
      )
      .where("isPass", true)
      .whereNotIn("type", ["كوتا", "مسيحي", "شيشاني"]) // Exclude candidates of types كوتا and مسيحي
      .orderBy(
        ["city", "circle", "list", "candidate_votes"],
        ["asc", "asc", "asc", "desc"]
      ); // Sort by city, circle, list, and candidate_votes descending

    // Group candidates by city, circle, and list
    const groupedCandidates = passedCandidates.reduce((acc, candidate) => {
      const key = `${candidate.city}-${candidate.circle}-${candidate.list}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(candidate);
      return acc;
    }, {});

    // Function to distribute seats based on votes
    const distributeSeats = (candidates, totalSeats) => {
      // Sort candidates by votes in descending order
      const sortedCandidates = candidates.sort(
        (a, b) => b.candidate_votes - a.candidate_votes
      );
      let remainingSeats = totalSeats;

      return sortedCandidates
        .map((candidate) => {
          const allocatedSeats = Math.min(
            remainingSeats,
            Math.floor(
              (candidate.candidate_votes /
                sortedCandidates[0].candidate_votes) *
                totalSeats
            )
          );
          remainingSeats -= allocatedSeats;
          return {
            ...candidate,
            allocatedSeats,
          };
        })
        .filter((candidate) => candidate.allocatedSeats > 0);
    };

    // Distribute seats for each group
    const finalResults = Object.entries(groupedCandidates).map(
      ([key, candidates]) => {
        const [city, circle, list] = key.split("-");
        const totalSeats = 7;

        const distributedCandidates = distributeSeats(candidates, totalSeats);

        return {
          city,
          circle,
          list,
          totalSeats,
          candidates: distributedCandidates,
        };
      }
    );

    res.json(finalResults);
  } catch (err) {
    res.status(500).json({
      error: "Error retrieving and distributing seats for passed candidates",
    });
  }
});

// router.get('/candidates/passed', async (req, res) => {
//     try {
//       // Retrieve candidates marked as passed, excluding types كوتا, مسيحي, and شيشاني
//       const passedCandidates = await knex('candidates')
//         .select('id', 'name', 'city', 'circle', 'list', 'candidate_votes', 'totalSeats', 'type')
//         .where('isPass', true)
//         .whereNotIn('type', ['كوتا', 'مسيحي', 'شيشاني']) // Exclude candidates of types كوتا, مسيحي, شيشاني
//         .orderBy(['city', 'circle', 'list', 'candidate_votes'], ['asc', 'asc', 'asc', 'desc']); // Sort by city, circle, list, and candidate_votes descending

//       // Group candidates by city, circle, and list
//       const groupedCandidates = passedCandidates.reduce((acc, candidate) => {
//         const key = `${candidate.city}-${candidate.circle}-${candidate.list}`;
//         if (!acc[key]) acc[key] = [];
//         acc[key].push(candidate);
//         return acc;
//       }, {});

//       // Function to distribute seats based on votes
//       const distributeSeats = (candidates, totalSeats) => {
//         // Sort candidates by votes in descending order
//         const sortedCandidates = candidates.sort((a, b) => b.candidate_votes - a.candidate_votes);
//         let remainingSeats = totalSeats;

//         return sortedCandidates.map(candidate => {
//           const allocatedSeats = Math.min(remainingSeats, Math.floor(candidate.candidate_votes / sortedCandidates[0].candidate_votes * totalSeats));
//           remainingSeats -= allocatedSeats;
//           return {
//             ...candidate,
//             allocatedSeats
//           };
//         }).filter(candidate => candidate.allocatedSeats > 0);
//       };

//       // Distribute seats for each group
//       const finalResults = Object.entries(groupedCandidates).map(([key, candidates]) => {
//         const [city, circle, list] = key.split('-');
//         const totalSeats = 7;

//         const distributedCandidates = distributeSeats(candidates, totalSeats);

//         return {
//           city,
//           circle,
//           list,
//           totalSeats,
//           candidates: distributedCandidates
//         };
//       });

//         const specialCandidates = await knex('candidates')
//         .select('id', 'name', 'city', 'circle', 'list', 'candidate_votes', 'totalSeats', 'type')
//         .where('isPass', true)
//         .whereIn('type', ['كوتا', 'مسيحي', 'شيشاني']) // Include كوتا, مسيحي, شيشاني
//         .orderBy(['city', 'circle', 'type', 'candidate_votes'], ['asc', 'asc', 'asc', 'desc']);
//       const groupedSpecialCandidates = specialCandidates.reduce((acc, candidate) => {
//         const key = `${candidate.city}-${candidate.circle}-${candidate.type}`;
//         if (!acc[key]) acc[key] = [];
//         acc[key].push(candidate);
//         return acc;
//       }, {});

//       // Function to determine the winner for each type
//       const determineWinners = (candidates) => {
//         // Sort candidates by votes in descending order
//         const sortedCandidates = candidates.sort((a, b) => b.candidate_votes - a.candidate_votes);
//         // Return the candidate with the highest votes
//         const highestVoteCandidate = sortedCandidates[0];
//         return {
//           ...highestVoteCandidate,
//           allocatedSeats: 1 // Assign 1 seat to the candidate with the highest votes
//         };
//       };

//       // Determine winners for each type
//       const specialResults = Object.entries(groupedSpecialCandidates).map(([key, candidates]) => {
//         const [city, circle, type] = key.split('-');

//         // For كوتا, مسيحي, and شيشاني, select the highest voted candidate in each circle
//         let winner;
//         if (['شيشاني', 'مسيحي', 'كوتا'].includes(type)) {
//           // Group by circle and find the candidate with the highest votes in each circle
//           const groupedByCircle = candidates.reduce((acc, candidate) => {
//             if (!acc[candidate.circle]) acc[candidate.circle] = [];
//             acc[candidate.circle].push(candidate);
//             return acc;
//           }, {});

//           // Determine the winner for each circle
//           winner = Object.entries(groupedByCircle).map(([circle, candidatesInCircle]) => {
//             return determineWinners(candidatesInCircle);
//           });
//         } else {
//           winner = [determineWinners(candidates)];
//         }

//         return {
//           city,
//           circle,
//           type,
//           winners: winner
//         };
//       });

//       // Combine final results and special results
//       const combinedResults = [...finalResults, ...specialResults.flatMap(result => result.winners.map(winner => ({
//         city: result.city,
//         circle: result.circle,
//         type: result.type,
//         winner: winner,
//       })))];

//       res.json(combinedResults);
//     } catch (err) {
//       res.status(500).json({ error: 'Error retrieving and distributing seats for passed candidates' });
//     }
//   });

router.get("/candidates/passedf", async (req, res) => {
  try {
    // Retrieve regular candidates marked as passed, excluding types كوتا, مسيحي, and شيشاني
    const passedCandidates = await knex("candidates")
      .select(
        "id",
        "name",
        "city",
        "circle",
        "list",
        "candidate_votes",
        "totalSeats",
        "type"
      )
      .where("isPass", true)
      .whereNotIn("type", ["كوتا", "مسيحي", "شيشاني"])
      .orderBy(
        ["city", "circle", "list", "candidate_votes"],
        ["asc", "asc", "asc", "desc"]
      );

    // Group regular candidates by city, circle, and list
    const groupedCandidates = passedCandidates.reduce((acc, candidate) => {
      const key = `${candidate.city}-${candidate.circle}-${candidate.list}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(candidate);
      return acc;
    }, {});

    // Function to distribute seats based on votes (unchanged)
    const distributeSeats = (candidates, totalSeats) => {
      const sortedCandidates = candidates.sort(
        (a, b) => b.candidate_votes - a.candidate_votes
      );
      let remainingSeats = totalSeats;

      return sortedCandidates
        .map((candidate) => {
          const allocatedSeats = Math.min(
            remainingSeats,
            Math.floor(
              (candidate.candidate_votes /
                sortedCandidates[0].candidate_votes) *
                totalSeats
            )
          );
          remainingSeats -= allocatedSeats;
          return {
            ...candidate,
            allocatedSeats,
          };
        })
        .filter((candidate) => candidate.allocatedSeats > 0);
    };

    // Distribute seats for each regular group
    const regularResults = Object.entries(groupedCandidates).map(
      ([key, candidates]) => {
        const [city, circle, list] = key.split("-");
        const totalSeats = 7;

        const distributedCandidates = distributeSeats(candidates, totalSeats);

        return {
          city,
          circle,
          list,
          totalSeats,
          candidates: distributedCandidates,
        };
      }
    );

    // Retrieve special candidates (كوتا, مسيحي, شيشاني)
    const specialCandidates = await knex("candidates")
      .select(
        "id",
        "name",
        "city",
        "circle",
        "list",
        "candidate_votes",
        "totalSeats",
        "type"
      )
      .where("isPass", true)
      .whereIn("type", ["كوتا", "مسيحي", "شيشاني"])
      .orderBy(
        ["city", "circle", "type", "candidate_votes"],
        ["asc", "asc", "asc", "desc"]
      );

    // Group special candidates by city, circle, and type
    const groupedSpecialCandidates = specialCandidates.reduce(
      (acc, candidate) => {
        const key = `${candidate.city}-${candidate.circle}-${candidate.type}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(candidate);
        return acc;
      },
      {}
    );

    // Function to determine the winner for each special type
    const determineWinner = (candidates) => {
      const sortedCandidates = candidates.sort(
        (a, b) => b.candidate_votes - a.candidate_votes
      );
      return {
        ...sortedCandidates[0],
        allocatedSeats: 1,
      };
    };

    // Determine winners for each special type
    const specialResults = Object.entries(groupedSpecialCandidates).map(
      ([key, candidates]) => {
        const [city, circle, type] = key.split("-");
        const winner = determineWinner(candidates);

        return {
          city,
          circle,
          type,
          winner: winner,
        };
      }
    );

    // Combine regular results and special results
    const combinedResults = [...regularResults, ...specialResults];

    res.json(combinedResults);
  } catch (err) {
    res.status(500).json({
      error: "Error retrieving and distributing seats for passed candidates",
    });
  }
});

module.exports = router;
