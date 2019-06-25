import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import moment from "moment";

import {
  getFormattedDate,
  getCurrentMonth,
  isToday as isTodayFunc,
  isBefore
} from "../../../utils";

import styles from "./Header.styles";

const getColumns = (numberOfDays, selectedDate) => {
  const columns = [];
  let initial = 0;
  if (numberOfDays === 7) {
    // initial = 1;
    initial -= moment().weekday();
  }
  for (let i = initial; i < numberOfDays + initial; i += 1) {
    let date = moment(selectedDate);
    date = date.add(i, "d");
    columns.push(date.toDate());
  }
  return columns;
};

const getFontSizeHeader = numberOfDays => {
  if (numberOfDays > 1) {
    return 12;
  }

  return 16;
};

const getDayTextStyles = (date, numberOfDays) => {
  const isToday = isTodayFunc(date);
  const fontSize = numberOfDays === 7 ? 18 : 20;
  const color = isToday ? "#FFF" : isBefore(date) ? "#bbb" : "#000";
  const backgroundColor = isToday ? "#00f" : "#FFF";

  return {
    fontSize,
    color,
    backgroundColor,
    borderRadius: (fontSize + 4) / 2 + 3,
    padding: 4,
    overflow: "hidden"
  };
};

const Column = ({ column, numberOfDays, format }) => {
  return (
    <View style={styles.column}>
      <Text style={styles.text}>{moment(column).format("dd")[0]}</Text>
      <Text style={[styles.text, getDayTextStyles(column, numberOfDays)]}>
        {getFormattedDate(column, format)}
      </Text>
    </View>
  );
};

const Columns = ({ columns, numberOfDays, format }) => {
  return (
    <View style={styles.columns}>
      {columns.map(column => {
        return (
          <Column
            key={column}
            column={column}
            numberOfDays={numberOfDays}
            format={format}
          />
        );
      })}
    </View>
  );
};

const Title = ({ numberOfDays, selectedDate }) => {
  // eslint-disable-line react/prop-types
  return (
    <View style={styles.title}>
      <Text
        style={[styles.text, { fontSize: getFontSizeHeader(numberOfDays) }]}
      >
        {getCurrentMonth(selectedDate)}
      </Text>
    </View>
  );
};

const WeekViewHeader = ({ numberOfDays, selectedDate, formatDate, style }) => {
  const columns = getColumns(numberOfDays, selectedDate);
  return (
    <View style={[styles.container, style]}>
      <Title numberOfDays={numberOfDays} selectedDate={selectedDate} />
      {columns && (
        <Columns
          format={formatDate}
          columns={columns}
          numberOfDays={numberOfDays}
        />
      )}
    </View>
  );
};

WeekViewHeader.propTypes = {
  numberOfDays: PropTypes.oneOf([1, 3, 7]).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  formatDate: PropTypes.string,
  style: PropTypes.object
};

WeekViewHeader.defaultProps = {
  formatDate: "MMM D"
};

export default WeekViewHeader;
