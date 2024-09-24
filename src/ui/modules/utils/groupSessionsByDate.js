import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function groupSessionsByDate(sessions) {
  const grouped = {
    today: [],
    yesterday: [],
    past7Days: [],
    past30Days: [],
  };

  const now = dayjs().tz("Asia/Baku"); // Adjust for UTC+4

  sessions.forEach((session) => {
    const sessionDate = dayjs(session.created_at).tz("Asia/Baku");
    const diffDays = now.diff(sessionDate, "day");

    if (diffDays === 0) {
      grouped.today.push(session);
    } else if (diffDays === 1) {
      grouped.yesterday.push(session);
    } else if (diffDays <= 7) {
      grouped.past7Days.push(session);
    } else {
      grouped.past30Days.push(session);
    }
  });

  return grouped;
}

export default groupSessionsByDate;
