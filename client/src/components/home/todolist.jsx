import React from 'react'
import PropTypes from 'prop-types'

const Todolist = props => {
    const { todoList, onTodoListClick } = props;
    // console.log(todoList);
    function handleID(item) {
        if (onTodoListClick) {
            onTodoListClick(item)
        }
    }
    console.log(todoList)
    return (
        <ul>
            {
                todoList ?
                    todoList.map(item => <li onClick={() => handleID(item)} key={item.id}>{item.title}</li>) : 'Không có gì cả'}
        </ul>
    )
}

Todolist.propTypes = {
    todoList: PropTypes.any,
    onTodoListClick: PropTypes.func
}
Todolist.defaultProps = {
    todoList: [],
    onTodoListClick: null
}

export default Todolist
