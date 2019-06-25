import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  Modal,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

import styles from "./EventModal.styles";

const EventModal = ({ visible, event, onConfirm, onCancel }) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState("date");
  const [description, setDescription] = useState(event ? event.description: "");
  const [date, setDate] = useState({
    from: event && moment(event.startDate) || moment(),
    to: event && moment(event.endDate) || moment().add(1, "hour")
  });
  const [type, setType] = useState("from");

  const showPicker = (mode, type) => {
    setDatePickerVisible(true);
    setPickerMode(mode);
    setType(type);
  };

  const setDateTime = dateTime => {
    const newDate = date[type];
    if (pickerMode === "date") {
      newDate
        .year(dateTime.getFullYear())
        .month(dateTime.getMonth())
        .date(dateTime.getDate());
    } else if (pickerMode === "time") {
      newDate.hour(dateTime.getHours()).minute(dateTime.getMinutes());
    }

    setDatePickerVisible(false);
    setDate({ ...date, [type]: newDate });
  };

  return (
    <Modal visible={visible}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.dateTime}>
          <TouchableOpacity onPress={onCancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm.bind(this, description, date)}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Title"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.dateTime}>
          <Text onPress={() => showPicker("date", "from")}>
            {date.from.format("ddd, MMM D, YYYY")}
          </Text>
          <Text onPress={() => showPicker("time", "from")}>
            {date.from.format("HH:mm")}
          </Text>
        </View>
        <View style={styles.dateTime}>
          <Text onPress={() => showPicker("date", "to")}>
            {date.to.format("ddd, MMM D, YYYY")}
          </Text>
          <Text onPress={() => showPicker("time", "to")}>
            {date.to.format("HH:mm")}
          </Text>
        </View>
        <DateTimePicker
          date={date[type].toDate()}
          isVisible={datePickerVisible}
          mode={pickerMode}
          onConfirm={setDateTime}
          onCancel={() => setDatePickerVisible(false)}
        />
      </SafeAreaView>
    </Modal>
  );
};

EventModal.propTypes = {
  visible: PropTypes.bool,
  event: PropTypes.object,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

EventModal.defaultProps = {
  visible: false,
  event: null,
  onConfirm: () => {},
  onCancel: () => {}
};

export default EventModal;
