import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import Constants from "expo-constants";
import { colors } from "./src/utils/colors";
import { Focus } from "./src/features/Focus";
import { Timer } from "./src/features/Timer";

export default function App() {
  console.log("there is an error in timer component");

  const [currentSubject, setCurrentSubject] = useState(null);
  const [previousSubjects, setPreviousSubject] = useState([]);

  function handleTimeEnd() {
    setPreviousSubject([{ currentSubject, done: true }, ...previousSubjects]);
    setCurrentSubject(null);
  }
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <Focus
          addSubject={setCurrentSubject}
          previousFocus={previousSubjects}
          setPreviousSubject={setPreviousSubject}
        />
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimeEnd={handleTimeEnd}
          setCurrentSubject={setCurrentSubject}
          currentSubject={currentSubject}
          setPreviousSubject={setPreviousSubject}
          previousSubjects={previousSubjects}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.beige,
  },
});
