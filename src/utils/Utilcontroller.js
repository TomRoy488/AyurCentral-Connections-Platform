class UtilController {
  static formatdate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };
  static formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
      hour12: true,
      timeZone: "Asia/Kolkata", // Adjust the timeZone as needed
    };

    const formattedDateTime = new Date(dateString).toLocaleString(
      "en-US",
      options
    );
    return formattedDateTime;
  };
}
export default UtilController;
