import '../styles/TodoList.scss';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className={'todo-list'}>
      {todos.map(todo =>
        <TodoListItem
					todo={todo}
					key={todo.id}
					onRemove={onRemove}
					onToggle={onToggle}
				/>,
      )}
    </div>
  );
};

export default TodoList;