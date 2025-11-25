import Todo from '../models/todoModel.js';
import { Op } from 'sequelize';

export async function getAllTodos(offset, limit = 5, search = '') {
  let titleFilter = '';
  if (search) {
    titleFilter = {
      [Op.like]: `%${search}%`,
    };
  }
  const todos = await Todo.findAll({
    offset,
    limit,
    ...titleFilter,
  });

  return todos;
}

export async function getTodoById(todoId) {
  const todo = await Todo.findOne({ where: { id: todoId } });

  return todo;
}

export async function deleteTodoById(todoId) {
  await Todo.destroy({
    where: {
      id: todoId,
    },
  });
}

export async function createTodo(addTodo) {
  const addedTodo = await Todo.create(addTodo);

  return addedTodo;
}

export async function updateTodo(updateTodo) {
  await Todo.update(updateTodo, {
    where: {
      id: updateTodo.id,
    },
  });
}

export async function countTodo(search = '') {
  let titleFilter = '';
  if (search) {
    where : {
      titleFilter = {
        [Op.like]: `%${search}%`,
      };
    }
    
  }
  return await Todo.count(titleFilter);
}
