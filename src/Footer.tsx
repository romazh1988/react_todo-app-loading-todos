import React from 'react';
import { Todo } from './types/Todo';

interface Props {
  todos: Todo[];
}

export const Footer: React.FC<Props> = ({ todos }) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodoCounter">
        {activeTodosCount} items left
      </span>
    </footer>
  );
};
