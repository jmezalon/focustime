import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { spacing, fontSizes } from '../utils/sizes';

export function Focus({ addSubject, previousFocus, setPreviousSubject }) {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: fontSizes.xl }}>
          What would you like to focus on?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            label=""
            value={subject}
            onChangeText={setSubject}
            style={styles.textInput}
          />
          <View style={styles.button}>
            <RoundedButton
              title="+"
              size={50}
              onPress={() => {
                addSubject(subject);
                setSubject(null);
              }}
            />
          </View>
        </View>
      </View>
      <View style={{ padding: spacing.lg, flex: 0.4 }}>
        <Text style={{ fontSize: fontSizes.lg, textAlign: 'center' }}>
          Things you've focussed on...{' '}
        </Text>
        {previousFocus.length === 0 && (
          <Text style={{ textAlign: 'center' }}>Nothing yet...</Text>
        )}
        {previousFocus.map((el) => (
          <Text
            key={el.currentSubject}
            style={{
              color: el.done ? 'green' : 'red',
              textAlign: 'center',
            }}>
            {el.currentSubject}
          </Text>
        ))}
      </View>
      <View style={styles.clearButton}>
        <RoundedButton title='Clear' onPress={() => setPreviousSubject([])} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    padding: spacing.sm,
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  clearButton: {
    alignItems: 'center'
  }
});
