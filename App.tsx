import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

import { TabBar, type TabKey } from './src/components/TabBar';
import { formConfig } from './src/config/formConfig';
import { useDynamicForm } from './src/hooks/useDynamicForm';
import { usePersistedSubmission } from './src/hooks/usePersistedSubmission';
import { useTheme } from './src/hooks/useTheme';
import { FormScreen } from './src/screens/FormScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { RecordScreen } from './src/screens/RecordScreen';

export default function App() {
  const scheme = useColorScheme();
  const colors = useTheme();
  const [tab, setTab] = useState<TabKey>('home');
  const [submitting, setSubmitting] = useState(false);

  // O estado fica no App para não se perder ao trocar de aba.
  const { values, errors, progress, setValue, validate, reset } = useDynamicForm(formConfig);
  const { submission, loading, status, save, clear } = usePersistedSubmission();

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await save({ submittedAt: new Date().toISOString(), values });
      reset();
      setTab('record');
    } finally {
      setSubmitting(false);
    }
  }, [validate, save, values, reset]);

  const goToForm = useCallback(() => setTab('form'), []);

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={scheme === 'dark' ? 'dark' : 'light'} />

      <View style={styles.body}>
        {tab === 'home' ? (
          <HomeScreen submission={submission} loading={loading} onNavigate={setTab} />
        ) : null}
        {tab === 'form' ? (
          <FormScreen
            values={values}
            errors={errors}
            progress={progress}
            submitting={submitting}
            onChange={setValue}
            onSubmit={handleSubmit}
          />
        ) : null}
        {tab === 'record' ? (
          <RecordScreen
            submission={submission}
            loading={loading}
            status={status}
            onClear={clear}
            onGoToForm={goToForm}
          />
        ) : null}
      </View>

      <TabBar active={tab} onChange={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1 },
});
