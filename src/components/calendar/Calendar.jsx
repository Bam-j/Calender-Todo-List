import { useCallback, useRef, useState } from 'react';
import Header from './Header';
import TodoTemplate from '../todo_list/TodoTemplate';
import TodoInsert from '../todo_list/TodoInsert';
import TodoList from '../todo_list/TodoList';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import '../../styles/calendar/Calendar.scss';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [openTodoList, setOpenTodoList] = useState(false);
  const [todos, setTodos] = useState([]);

  const nextId = useRef(1);
  const modalBackground = useRef();
  const todoData = JSON.parse(localStorage.getItem('todo-data') || '[]');

  const onChange = date => {
    setStartDate(date);
    setOpenTodoList(true);
  };

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
      month: startDate.getMonth() + 1,
      date: startDate.getDate(),
    };

    setTodos(todos.concat(todo));
    console.log(todos);
    console.log(todo);

    todoData.push(todo);
    localStorage.setItem('todo-data', JSON.stringify(todoData));

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

  registerLocale('ko', ko);

  //const todoDataOfSelectedDate = todos.filter(todos =>
  //  todos.month === startDate.month && todos.date === startDate.date
  //);

  return (
    <>
      <Header />
      <div className={'calendar'}>
        <DatePicker
          locale={'ko'}
          selected={startDate}
          onChange={onChange}
          inline
        />
      </div>
      {openTodoList &&
        <div
          className={'todo-list-container'}
          ref={modalBackground}
          onClick={e => {
            if (e.target === modalBackground.current) {
              setOpenTodoList(false);
            }}}
        >
          <TodoTemplate>
            <TodoInsert onInsert={onInsert} />
            <TodoList
              todos={todos}
              onRemove={onRemove}
              onToggle={onToggle}
            />
          </TodoTemplate>
        </div>
      }
    </>
  );
};

export default Calendar;