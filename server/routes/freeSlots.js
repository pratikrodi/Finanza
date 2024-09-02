const router = require("express").Router();
const moment = require("moment-timezone");
const staticConfig = require("../staticConfig");

moment.tz.setDefault(staticConfig.timezone);

router.route("/").post((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const reqTimezone = req.body.reqTimezone;
  console.log(reqTimezone);

  let start = moment(staticConfig.startHours, "HH:mm");
  let end = moment(staticConfig.endHours, "HH:mm");

  let changedStart = moment.tz(start, reqTimezone);
  let changedEnd = moment.tz(end, reqTimezone);

  let slots = [moment(changedStart)];
  while (moment(changedStart) < moment(changedEnd)) {
    changedStart = moment(changedStart).add(staticConfig.duration, "minutes");
    slots.push(moment(changedStart));
  }
  console.log(slots);

  res.send(slots);
});

module.exports = router;
