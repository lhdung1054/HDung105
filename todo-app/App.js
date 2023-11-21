import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Switch, Button } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { id: tasks.length + 1, task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, newTaskText) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, task: newTaskText };
      }
      return task;
    }));
  };

  const filteredTasks = tasks.filter((task) => {
    if (!searchTerm) return true;
    return task.task.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderItem = ({ item }) => {
    const textDecorationLine = item.completed ? 'line-through' : 'none';
    return (
      <View style={styles.taskContainer}>
        <Switch
          value={item.completed}
          onValueChange={() => toggleTaskCompletion(item.id)}
        />

        <TextInput
          style={[styles.taskText, { textDecorationLine }]}
          value={item.task}
          onChangeText={(text) => editTask(item.id, text)}
          editable={!item.completed}
        />

        <Button title="Delete" onPress={() => deleteTask(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />

        <Button title="Thêm công việc" onPress={addTask} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm công việc"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  header: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    flex: 1,
    margin:10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchContainer: {
    marginBottom: 20,
    padding: 10,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: 'pink',
  },
  taskText: {
    marginLeft: 10,
    flex: 1,
  },
});

export default App;
