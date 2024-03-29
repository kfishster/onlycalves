import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  LeaderboardStatus,
  setLeaderboardRows,
  setLeaderboardStatus,
  setTotalVotes,
} from "../store/leaderboardSlice";
import { fetchMatchupResults } from "../utils/apiConnector";
import { appInsightsTracking } from "../utils/appInsights";
import numeral from "numeral";

// const placeholderLeaderboard: LeaderboardRow[] = [
//   { userId: "aa", nickname: "aa", score: 200 },
//   { userId: "aa", nickname: "the cool one", score: 10 },
//   { userId: "aa", nickname: "oh yas", score: 0 },
//   { userId: "aa", nickname: "asdkjh asdfkjh asdf lkjh", score: 0 },
//   { userId: "aa", nickname: "asdkjha a", score: 0 },
// ];

// const computeLeaderboard = (
//   matchupResultsResponse: MatchupResultsResponse
// ): LeaderboardRow[] => {
//   const leaderboardFreqCount: { [key: string]: number } = {};

//   const activeUsers = Object.fromEntries(
//     matchupResultsResponse.activeUsers.map((x) => [x.userId, x.nickname])
//   );

//   // for now just a simple tally
//   for (const res of matchupResultsResponse.matchups) {
//     if (activeUsers[res.winnerUserId]) {
//       leaderboardFreqCount[res.winnerUserId] = leaderboardFreqCount[
//         res.winnerUserId
//       ]
//         ? leaderboardFreqCount[res.winnerUserId] + 1
//         : 1;
//     }
//   }

//   const leaderboardRows: LeaderboardRow[] = Object.entries(leaderboardFreqCount)
//     .map((entry) => ({
//       userId: entry[0],
//       nickname: activeUsers[entry[0]],
//       score: entry[1],
//     }))
//     .sort((r1, r2) => r2.score - r1.score);

//   return leaderboardRows;
// };

const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const leaderboard = useAppSelector((state) => state.leaderboard);

  useEffect(() => {
    const getMatchupResults = async () => {
      dispatch(setLeaderboardStatus(LeaderboardStatus.Loading));
      const matchupResultsResponse = await fetchMatchupResults();

      if ("error" in matchupResultsResponse) {
        dispatch(setLeaderboardStatus(LeaderboardStatus.Error));
      } else {
        dispatch(setLeaderboardRows(matchupResultsResponse.leaderboardRows));
        dispatch(setTotalVotes(matchupResultsResponse.totalVotes));
      }
    };

    // load leaderboard
    getMatchupResults();
    // dispatch(setLeaderboardRows(placeholderLeaderboard));
  }, [dispatch]);

  return (
    <div className="flex flex-col md:w-1/2 w-full gap-4">
      <h1 className="text-3xl font-bold text-center">Leaderboard</h1>
      {leaderboard.status === LeaderboardStatus.Loading && (
        <div className="text-center flex justify-center">Loading...</div>
      )}
      {leaderboard.status === LeaderboardStatus.Ready && (
        <div className="flex w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="text-md font-extralight text-center">
              {numeral(leaderboard.totalCount).format("0,0")} votes
            </div>
            {leaderboard.leaderboardRows.map((row, idx) => (
              <div
                className={`flex flex-row justify-between transition-colors gap-1 dark:bg-slate-700 bg-slate-200 rounded-lg p-2 px-4 h-full items-center ${
                  idx === 0
                    ? " bg-gradient-to-r dark:from-blue-800 dark:to-blue-600 from-blue-300 to-blue-500"
                    : ""
                }`}
              >
                <div className="flex flex-row gap-3">
                  <div className="flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div
                    className={`${
                      idx === 0 ? "text-2xl" : "text-lg"
                    } font-semibold flex justify-center`}
                  >
                    {row.nickname}
                  </div>
                </div>
                <div className="flex flex-row flex-shrink-0 gap-2 justify-end">
                  <div className="text-sm justify-center flex items-center font-extralight break-keep">
                    {row.score} / {row.matchups}
                  </div>
                  <div className="font-bold flex">
                    {(row.approval * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default appInsightsTracking("Leaderboard", Leaderboard);
