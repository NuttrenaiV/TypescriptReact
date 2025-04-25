import axios from "axios";
import { useEffect, useState } from "react";

interface Budget {
    id: number;
    category: string;
    amount: number;
    date: string;
    mode: string;
}

const BudgetTable = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [searchBudget, setSearchBudget] = useState<string>("");
    const [editBudget, setEditBudget] = useState<Budget | null>(null);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await axios.get("http://localhost:3000/budgets");
                setBudgets(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBudgets();
    }, []);

    const handleDelete = async (expenseid: number) => {
        try {
            await axios.delete(`http://localhost:3000/budgets/${expenseid}`);
            setBudgets(budgets.filter((budget) => budget.id !== expenseid));
            alert("Budget deleted successfully!");
        } catch (error) {
            console.error(error);
        }
    };

   //handling the update function using handleupdate

   const handleUpdate = async (budget: Budget) => {
    try {
        await axios.put(`http://localhost:3000/budgets/${budget.id}`, budget);
        setBudgets(budgets.map((b) => (b.id === budget.id ? budget : b)));
        setEditBudget(null);
        alert("Budget updated successfully!");
    } catch (error) {
        console.error(error);
    }
   }
    //handling the edit function using handleupdate
   const handleEdit = (budget: Budget) => {
    setEditBudget(budget);
   }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchBudget(event.target.value);

    const filteredBudgets = budgets.filter((budget) =>
        budget.category.toLowerCase().includes(searchBudget.toLowerCase())
    );

    return (
        <div>
            <h2>Budget Search</h2>
            <input
                type="text"
                placeholder="Search by category"
                value={searchBudget}
                onChange={handleInputChange}
            />
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Mode</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBudgets.map((budget) => (
                        <tr key={budget.id}>
                            <td>{budget.category}</td>
                            <td>{budget.amount}</td>
                            <td>{budget.date}</td>
                            <td>{budget.mode}</td>
                            <td>
                                <button onClick={() => handleUpdate(budget)} style={{backgroundColor: "blue"}}>Edit</button>
                                <button onClick={() => handleDelete(budget.id)} style={{backgroundColor: "red"}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BudgetTable;

