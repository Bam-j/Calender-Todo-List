import TodoTemplate from './components/todo_list/TodoTemplate';
import TodoInsert from './components/todo_list/TodoInsert';
import TodoList from './components/todo_list/TodoList';
import { useCallback, useRef, useState } from 'react';
import Calendar from './components/calendar/Calendar';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '투 두 제작',
      checked: true,
    },
    {
      id: 2,
      text: '투 두 제작',
      checked: false,
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };

    setTodos(todos.concat(todo));
    nextId.current += 1;
  }, [todos]);

  const onRemove = useCallback(id => {
    setTodos(todos.filter(
      todo => todo.id !== id,
    ));
  }, [todos]);

  const onToggle = useCallback(id => {
    setTodos(
      todos.map(
        todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, [todos]);

  return (
    <>
      <Calendar />

      {/*
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
      */}
    </>
  );
};

export default App;