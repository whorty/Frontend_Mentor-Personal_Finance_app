import supabase from "../supabase-client";

export async function fetchBalance() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    try {
      const { data, error } = await supabase
        .from("Personal_Finance_App-Balance")
        .select()
        .eq("user_id", user.id);
      if (error) {
        throw new Error("Error fetching data for balance:", error);
      }
      return data;
    } catch (e) {
      console.error("Error:", e);
      return null;
    }
  }
  return null;
}

export async function updateBalance(user_id: string, amount: number) {
  try {
    // Use increment method to add or subtract from the current balance
    const { data, error } = await supabase
      .from("Personal_Finance_App-Balance")
      .update({ current: amount })
      .eq("user_id", user_id)
      .select();

    if (error) {
      throw new Error("Error updating balance:", error);
    }

    return data;
  } catch (e) {
    console.error("Error updating balance:", e);
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    try {
      const { data, error } = await supabase
        .from("Personal_Finance_App-Pots")
        .select()
        .eq("user_id", user.id);
      if (error) {
        throw new Error("Error fetching data for pots:", error);
      }
      return data;
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }
  return [];
}

export async function fetchBudgets() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    try {
      const { data, error } = await supabase
        .from("Personal_Finance_App-Budgets")
        .select()
        .eq("user_id", user.id);
      if (error) {
        throw new Error("Error fetching data for budgets:", error);
      }
      return data;
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }
}

export async function addBudget(budgetData: {
  category: string;
  maximum: number;
  theme: string;
}) {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance_App-Budgets")
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
      .from("Personal_Finance_App-Budgets")
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
      .from("Personal_Finance_App-Budgets")
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

export interface PotData {
  name: string;
  target: number;
  theme: string;
}

export async function addPot(PotData: PotData) {
  try {
    console.log("try:", PotData);
    const { data, error } = await supabase
      .from("Personal_Finance_App-Pots")
      .insert([PotData])
      .select();
    if (error) {
      throw new Error("Error adding Pot:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

export async function updatePot(
  id: number,
  PotData: PotData | { total: number }
) {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance_App-Pots")
      .update(PotData)
      .eq("id", id)
      .select();
    if (error) {
      throw new Error("Error updating Pot:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

export async function deletePot(id: number) {
  const [datab] = (await fetchBalance()) ?? [];
  const { current } = datab;
  try {
    const { data: pot, error: potError } = await supabase
      .from("Personal_Finance_App-Pots")
      .select()
      .eq("id", id)
      .single();

    if (potError || !pot) {
      throw new Error("Error fetching pot details.");
    }

    // Add the pot's total back to the user's balance
    const { total, user_id } = pot;
    const updatedBalance = await updateBalance(user_id, current + total); // Add the pot's total back to balance

    if (!updatedBalance) {
      throw new Error("Failed to update balance after pot deletion.");
    }

    const { error } = await supabase
      .from("Personal_Finance_App-Pots")
      .delete()
      .eq("id", id);
    if (error) {
      throw new Error("Error deleting Pot:", error);
    }
    return true;
  } catch (e) {
    console.error("Error:", e);
    return false;
  }
}

export async function fetchSummaryBills() {
  try {
    const { data, error } = await supabase.from("finance_summary").select();
    if (error) {
      throw new Error("Error fetching data for finance_summary:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return [];
  }
}

export async function fetchGrandTotal() {
  try {
    const { data, error } = await supabase.from("view_grand_total").select();
    if (error) {
      throw new Error("Error fetching data for view_grand_total:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return [];
  }
}
