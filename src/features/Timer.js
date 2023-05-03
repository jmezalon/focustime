import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({
  focusSubject,
  setCurrentSubject,
  setPreviousSubject,
  previousSubjects,
  currentSubject,
  onTimeEnd,
}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={() => {
            setIsStarted(false);
            Vibration.vibrate(PATTERN);
            onTimeEnd();
            setCurrentSubject(null);
          }}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={styles.progressbar}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.minutesContainer}>
        <RoundedButton title="10" size={75} onPress={() => setMinutes(10)} />
        <RoundedButton title="20" size={75} onPress={() => setMinutes(20)} />
        <RoundedButton title="30" size={75} onPress={() => setMinutes(30)} />
      </View>
      <View style={styles.buttonWraper}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={{ paddingLeft: spacing.sm }}>
        <RoundedButton
          title="<"
          size={50}
          onPress={() => {
            setCurrentSubject(null);
            setMinutes(0.1);
            setPreviousSubject([
              { currentSubject, done: false },
              ...previousSubjects,
            ]);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWraper: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.black,
    textAlign: 'center',
  },
  minutesContainer: {
    flex: 0.2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: spacing.sm,
    alignItems: 'center',
  },
  progressbar: {
    paddingTop: spacing.sm,
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
});
