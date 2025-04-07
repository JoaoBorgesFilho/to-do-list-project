import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "Criar funcionalidades X no sistema",
            category: "Trabalho",
            isCompleted: false,
        },
        {
            id: 2,
            text: "Estudar React e revisar hooks",
            category: "Estudos",
            isCompleted: false,
        },
        {
            id: 3,
            text: "Enviar e-mail com o relatório semanal",
            category: "Trabalho",
            isCompleted: true,
        },
    ]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Ascendente");

    // 🌗 Controle de tema
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.body.classList.add(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const addTodo = (text, category) => {
        const newTodos = [
            ...todos,
            {
                id: Math.floor(Math.random() * 10000),
                text,
                category,
                isComplete: false,
            },
        ];
        setTodos(newTodos);
    };

    const removeTodo = (id) => {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
    };

    const completeTodo = (id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <button
                id="toggle-theme"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Alternar tema"
            >
                <span id="theme-icon">{theme === "light" ? "🌙" : "☀️"}</span>
            </button>
            <h1>Lista de Tarefas</h1>
            <Search search={search} setSearch={setSearch} />
            <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
            <div className="todo-list">
                {todos
                    .filter((todo) =>
                        filter === "All"
                            ? true
                            : filter === "Completed"
                            ? todo.isCompleted
                            : !todo.isCompleted
                    )
                    .filter((todo) =>
                        todo.text.toLowerCase().includes(search.toLowerCase())
                    )
                    .sort((a, b) =>
                        sort === "Ascendente"
                            ? a.text.localeCompare(b.text)
                            : b.text.localeCompare(a.text)
                    )
                    .map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            removeTodo={removeTodo}
                            completeTodo={completeTodo}
                        />
                    ))}
            </div>
            <TodoForm addTodo={addTodo} />
        </div>
    );
}

export default App;
