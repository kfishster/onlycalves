import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  LeaderboardRow,
  LeaderboardStatus,
  setLeaderboardRows,
  setLeaderboardStatus,
} from "../store/leaderboardSlice";
import {
  MatchupResult,
  MatchupResultsResponse,
  fetchMatchupResults,
} from "../utils/apiConnector";

const placeholderLeaderboard: LeaderboardRow[] = [
  { userId: "aa", nickname: "aa", score: 200 },
  { userId: "aa", nickname: "the cool one", score: 10 },
  { userId: "aa", nickname: "oh yas", score: 0 },
  { userId: "aa", nickname: "asdkjh asdfkjh asdf lkjh", score: 0 },
  { userId: "aa", nickname: "asdkjha a", score: 0 },
];

const computeLeaderboard = (
  matchupResultsResponse: MatchupResultsResponse
): LeaderboardRow[] => {
  const leaderboardFreqCount: { [key: string]: number } = {};

  const activeUsers = Object.fromEntries(
    matchupResultsResponse.activeUsers.map((x) => [x.userId, x.nickname])
  );

  // for now just a simple tally
  for (const res of matchupResultsResponse.matchups) {
    if (activeUsers[res.winnerUserId]) {
      leaderboardFreqCount[res.winnerUserId] = leaderboardFreqCount[
        res.winnerUserId
      ]
        ? leaderboardFreqCount[res.winnerUserId] + 1
        : 1;
    }
  }

  const leaderboardRows: LeaderboardRow[] = Object.entries(leaderboardFreqCount)
    .map((entry) => ({
      userId: entry[0],
      nickname: activeUsers[entry[0]],
      score: entry[1],
    }))
    .sort((r1, r2) => r2.score - r1.score);

  return leaderboardRows;
};

export const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const leaderboard = useAppSelector((state) => state.leaderboard);

  useEffect(() => {
    const getMatchupResults = async () => {
      dispatch(setLeaderboardStatus(LeaderboardStatus.Loading));
      const matchupResultsResponse = await fetchMatchupResults();

      if ("error" in matchupResultsResponse) {
        dispatch(setLeaderboardStatus(LeaderboardStatus.Error));
      } else {
        dispatch(
          setLeaderboardRows(computeLeaderboard(matchupResultsResponse))
        );
      }
    };

    // load leaderboard
    getMatchupResults();
    // dispatch(setLeaderboardRows(placeholderLeaderboard));
  }, []);

  return (
    <div className="flex flex-col md:w-1/2 w-full gap-4">
      <h1 className="text-3xl font-bold text-center">Leaderboard</h1>
      {leaderboard.status === LeaderboardStatus.Loading && (
        <div>Loading...</div>
      )}
      {leaderboard.status === LeaderboardStatus.Ready && (
        <div>
          <div className="flex flex-col gap-2">
            {leaderboard.leaderboardRows.map((row, idx) => (
              <div
                className={`flex flex-row transition-colors justify-between dark:bg-slate-700 bg-slate-200 rounded-lg p-2 px-4 h-full items-center ${
                  idx == 0
                    ? " bg-gradient-to-r dark:from-blue-800 dark:to-blue-600 from-blue-300 to-blue-500"
                    : ""
                }`}
              >
                <div>{idx + 1}</div>
                <div
                  className={`${
                    idx === 0 ? "text-2xl" : "text-lg"
                  } font-semibold`}
                >
                  {row.nickname}
                </div>
                <div className="font-bold">{row.score}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
