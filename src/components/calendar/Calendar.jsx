import { useCallback, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import '../../styles/calendar/Calendar.scss';
import 'react-datepicker/dist/react-datepicker.css';
import TodoTemplate from '../todo_list/TodoTemplate';
import TodoInsert from '../todo_list/TodoInsert';
import TodoList from '../todo_list/TodoList';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [openTodoList, setOpenTodoList] = useState(false);
  const [todos, setTodos] = useState([]);

  const nextId = useRef(4);
  const modalBackground = useRef();

  const onChange = date => {
    setStartDate(date);
    setOpenTodoList(true);
  };

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

  registerLocale('ko', ko);

  return (
    <>
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
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
          </TodoTemplate>
        </div>
      }
    </>
  );
};

export default Calendar;