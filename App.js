import React, { useState } from "react";
import { SafeAreaView, Alert } from "react-native";
import RNWeekView from "./src/components/Calendar/WeekView";
import EventModal from "./src/components/EventModal";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const showAddModal = () => {
    if (modalVisible) setSelectedEvent(null);
    setModalVisible(!modalVisible);
  };

  const handleAddEvent = (description, date) => {
    if (editMode) {
      setEvents(
        events.map(event =>
          event.id === selectedEvent.id
            ? {
                ...selectedEvent,
                description,
                startDate: date.from.toDate(),
                endDate: date.to.toDate()
              }
            : event
        )
      );
    } else {
      const range = moment.range(date.from, date.to);
      for (var i = 0; i < events.length; i++) {
        if (
          range.overlaps(moment.range(events[i].startDate, events[i].endDate))
        ) {
          Alert.alert("Warning", "No two appointsments should overlap");
          return;
        }
      }
      setEvents(
        events.concat({
          id: events.length,
          description,
          startDate: date.from.toDate(),
          endDate: date.to.toDate(),
          color: "blue"
        })
      );
    }
    showAddModal();
    setSelectedEvent(null);
  };

  const handleAddPress = () => {
    setEditMode(false);
    showAddModal();
  };

  const handleEventPress = evt => {
    setEditMode(true);
    setSelectedEvent(evt);
    showAddModal();
  };

  const handleEventLongPress = evt => {
    Alert.alert("Delete", `Delete this event?`, [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => setEvents(events.filter(event => event.id !== evt.id))
      }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RNWeekView
        events={events}
        numberOfDays={7}
        formatDateHeader="D"
        onEventPress={handleEventPress}
        onEventLongPress={handleEventLongPress}
        onAddPress={handleAddPress}
      />
      {modalVisible && (
        <EventModal
          event={selectedEvent}
          visible={modalVisible}
          onConfirm={handleAddEvent}
          onCancel={showAddModal}
        />
      )}
    </SafeAreaView>
  );
};

export default Calendar;
