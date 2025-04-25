import axios from "axios";
import { useState } from "react";

interface Budget {
    id: number;
    category: string;
    amount: number;
    date: string;
    mode: string;
}

const API_URL = "http://localhost:3000/budgets";

const BudgetForm = () => {
    const [budget, setBudget] = useState<Partial<Budget>>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBudget((prevBudget) => ({ ...prevBudget, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(API_URL, budget);
            console.log(response.data);
            alert("Budget added successfully!");
            setBudget({});
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div id="heading">
            <h2 id="title" style={{ textAlign: "center" }}>Personal Budget Tracking System</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <h2>Budget Table</h2>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Category</td>
                            <td>
                                <input type="text" name="category" onChange={handleChange} value={budget.category || ""} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            <td>
                                <input type="number" name="amount" onChange={handleChange} value={budget.amount || 0} required />
                            </td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>
                                <input type="date" name="date" onChange={handleChange} value={budget.date || ""} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>Mode</td>
                            <td>
                                <input type="text" name="mode" onChange={handleChange} value={budget.mode || ""} required/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit">Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default BudgetForm;

