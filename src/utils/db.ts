import supabase from "../supabase-client";

export async function fetchBalance() {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance_App-Balance")
      .select();
    if (error) {
      throw new Error("Error fetching data for balance:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

export async function fetchTransactions() {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance_App-Transactions")
      .select();
    if (error) {
      throw new Error("Error fetching data for transactions:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

export async function fetchPots() {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance_App-Pots")
      .select();
    if (error) {
      throw new Error("Error fetching data for pots:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return [];
  }
}

export async function fetchBudgets() {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance _App-Budgets")
      .select();
    if (error) {
      throw new Error("Error fetching data for budgets:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return [];
  }
}

export async function addBudget(budgetData: {
  category: string;
  maximum: number;
  theme: string;
}) {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance _App-Budgets")
      .insert([budgetData])
      .select();
    if (error) {
      throw new Error("Error adding budget:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

export async function updateBudget(
  id: number,
  budgetData: {
    category?: string;
    maximum?: number;
    theme?: string;
  }
) {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance _App-Budgets")
      .update(budgetData)
      .eq("id", id)
      .select();
    if (error) {
      throw new Error("Error updating budget:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

export async function deleteBudget(id: number) {
  try {
    const { error } = await supabase
      .from("Personal_Finance _App-Budgets")
      .delete()
      .eq("id", id);
    if (error) {
      throw new Error("Error deleting budget:", error);
    }
    return true;
  } catch (e) {
    console.error("Error:", e);
    return false;
  }
}
