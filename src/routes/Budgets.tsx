import { useContext, useMemo, useState } from "react";
import PieChart from "../components/Chart/PieChart";
import {
  DataContext,
  type Transaction,
  type TypeBudgets,
} from "../utils/DataContext";
import "../components/Budgets/BudgetsStyles.css";
import DetailLabel, { SpendingSummaryExt } from "../components/DetailsLabel";
import CardHeader from "../components/CardHeader";
import PopupMenu from "../components/PopUpMenu/PopupMenu";
import ellipsis from "/images/icons/icon-ellipsis.svg";
import { ProgressBarBudgets } from "../components/progressBar/ProgressBar";
import getLastest from "../utils/getLastest";
import getLastThreeFromMap from "../utils/getLastThreeFromMap";
import GenericContainer from "../components/GenericContainer";
import TransactionsList from "../components/TransactionsList";
import Modal from "../components/modals/modal.tsx";
import { addBudget, updateBudget, deleteBudget } from "../utils/db";

export default function Budgets() {
  const { budgetsData, transactionsData, refetchBudgets } =
    useContext(DataContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<TypeBudgets | null>(
    null
  );
  const totalSpentByCategory = useMemo(() => {
    if (!budgetsData || !transactionsData) return {} as Record<string, number>;
    const wanted = budgetsData.map((item) => item.category);
    const result = transactionsData.filter((t) => wanted.includes(t.category));
    const last3Transactions = getLastest<Transaction>(result);
    if (!last3Transactions) return {} as Record<string, number>;
    return Object.fromEntries(
      Object.entries(last3Transactions).map(([category, txs]) => {
        const total = txs.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return [category, total];
      })
    ) as Record<string, number>;
  }, [budgetsData, transactionsData]);

  const last3TransactionsMap = useMemo(() => {
    if (!transactionsData) return {} as Record<string, Transaction[]>;
    return getLastest<Transaction>(transactionsData) as Record<
      string,
      Transaction[]
    >;
  }, [transactionsData]);
  const availableCategories = useMemo(() => {
    if (!transactionsData) return [] as string[];
    const transCats = Array.from(
      new Set(transactionsData.map((t) => t.category))
    );
    const budgetCats = new Set((budgetsData || []).map((b) => b.category));
    return transCats.filter((c) => !budgetCats.has(c));
  }, [transactionsData, budgetsData]);

  const editableCategories = useMemo(() => {
    if (!transactionsData || !selectedBudget) return [] as string[];
    const transCats = Array.from(
      new Set(transactionsData.map((t) => t.category))
    );
    // For edit mode: exclude budgets except the one being edited
    const otherBudgetCats = new Set(
      (budgetsData || [])
        .filter((b) => b.id !== selectedBudget.id)
        .map((b) => b.category)
    );
    return transCats.filter((c) => !otherBudgetCats.has(c));
  }, [transactionsData, budgetsData, selectedBudget]);
  return (
    <section id="Budgets">
      <header>
        <h1>Budgets</h1>
        <button
          className="btn bg-black"
          id="Add_New-Budget"
          onClick={() => setOpenAdd(true)}
        >
          + Add New Budget
        </button>
        <Modal
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          title="Budget"
          mode="Add"
          categories={availableCategories}
          onSubmit={async (data) => {
            const result = await addBudget(data);
            if (result) {
              console.log("Budget added successfully:", result);
              await refetchBudgets?.();
            } else {
              console.error("Failed to add budget");
            }
          }}
        />
        <Modal
          isOpen={openEdit}
          onClose={() => {
            setOpenEdit(false);
            setSelectedBudget(null);
          }}
          title="Budget"
          mode="Edit"
          categories={editableCategories}
          initialData={
            selectedBudget
              ? {
                  category: selectedBudget.category,
                  maximum: selectedBudget.maximum,
                  theme: selectedBudget.theme,
                }
              : undefined
          }
          onSubmit={async (data) => {
            if (
              selectedBudget &&
              data.category &&
              data.maximum > 0 &&
              data.theme
            ) {
              const result = await updateBudget(selectedBudget.id, {
                category: data.category,
                maximum: data.maximum,
                theme: data.theme,
              });
              if (result) {
                console.log("Budget updated successfully:", result);
                await refetchBudgets?.();
              } else {
                console.error("Failed to update budget");
              }
            } else {
              console.error("Invalid form data: all fields must be filled");
            }
          }}
        />
        <Modal
          isOpen={openDelete}
          title={`'${selectedBudget?.category || ""}'?`}
          mode="Delete"
          onClose={() => {
            setOpenDelete(false);
            setSelectedBudget(null);
          }}
          onSubmit={async () => {
            if (selectedBudget) {
              const success = await deleteBudget(selectedBudget.id);
              if (success) {
                console.log("Budget deleted successfully");
                setOpenDelete(false);
                setSelectedBudget(null);
                await refetchBudgets?.();
              } else {
                console.error("Failed to delete budget");
              }
            }
          }}
        />
      </header>
      <section>
        <div id="Summary">
          <div className="generic">
            <PieChart budgets={budgetsData} />
            <div className="spending-summary">
              <h2>Spending Summary</h2>
              {budgetsData?.map((item) => (
                <SpendingSummaryExt
                  key={item.id}
                  item={item}
                  spent={totalSpentByCategory[item.category] ?? 0}
                />
              ))}
            </div>
          </div>
        </div>
        <div id="Budget-details">
          {budgetsData?.map((item) => (
            <div className="cardinfo bg-white" key={item.category}>
              <CardHeader theme={item.theme} name={item.category}>
                <PopupMenu
                  icon={ellipsis}
                  label="Budget"
                  onEdit={() => {
                    setSelectedBudget(item);
                    setOpenEdit(true);
                  }}
                  onDelete={() => {
                    setSelectedBudget(item);
                    setOpenDelete(true);
                  }}
                />
              </CardHeader>
              <h4>Maximum of ${item.maximum}</h4>
              <ProgressBarBudgets
                theme={item.theme}
                total={totalSpentByCategory[item.category] ?? 0}
                target={item.maximum}
              />
              <div className="detailInfo">
                <DetailLabel
                  item={{
                    id: item.id,
                    category: "Spent",
                    total: totalSpentByCategory[item.category] ?? 0,
                    theme: item.theme,
                    maximum: 0,
                  }}
                />
                <DetailLabel
                  item={{
                    id: item.id,
                    category: "Remaining",
                    total:
                      item.maximum -
                        (totalSpentByCategory[item.category] ?? 0) >
                      0
                        ? item.maximum -
                          (totalSpentByCategory[item.category] ?? 0)
                        : 0,
                    theme: "#f8f4f0",
                    maximum: 0,
                  }}
                />
              </div>
              <GenericContainer
                name="Lastest Spending"
                route="/app/Transactions"
              >
                {
                  // use precomputed last-3 map for this category
                  (() => {
                    const recent = getLastThreeFromMap(
                      last3TransactionsMap,
                      item.category
                    );
                    if (!recent || recent.length === 0) {
                      return <p className="muted">No recent transactions</p>;
                    }
                    return recent.map((tx) => (
                      <TransactionsList key={tx.id} transfer={tx} />
                    ));
                  })()
                }
              </GenericContainer>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
