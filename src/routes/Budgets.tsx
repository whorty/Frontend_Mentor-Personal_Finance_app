import { useContext } from "react";
import { DataContext, type TypeBudgets } from "../utils/DataContext";
import "../components/Budgets/BudgetsStyles.css";
import DetailLabel, { SpendingSummaryExt } from "../components/DetailsLabel";
import CardHeader from "../components/CardHeader";
import PopupMenu from "../components/PopUpMenu/PopupMenu";
import ellipsis from "/images/icons/icon-ellipsis.svg";
import { ProgressBarBudgets } from "../components/progressBar/ProgressBar";
// import getLastest from "../utils/getLastest";
import getLastThreeFromMap from "../utils/getLastThreeFromMap";
import GenericContainer from "../components/GenericContainer";
import TransactionsList from "../components/TransactionsList";
import Modal from "../components/modals/modal.tsx";
import { addBudget, updateBudget, deleteBudget } from "../utils/db";
import { useModal } from "../components/modals/useModal.ts";
// import PieChart from "../components/Chart/PieChart";
// import PieChartSvg from "../components/Chart/PieChartSvg.tsx";
import BasicPie from "../components/Chart/PiechartLibrary.tsx";
import {
  useTotalSpentByCategory,
  useGrandTotal,
  useLastTransactionsMap,
  useAvailableCategories,
  useEditableCategories,
  useInitialBudgetData,
} from "../hooks/useBudgetsMemo.ts";

export default function Budgets() {
  const { budgetsData, transactionsData, setBudgetsData } =
    useContext(DataContext);

  const {
    mode,
    selected: selectedBudget,
    isOpen,
    openAdd,
    openEdit,
    openDelete,
    close,
  } = useModal<TypeBudgets>();

  const totalSpentByCategory = useTotalSpentByCategory(
    budgetsData,
    transactionsData!
  );

  const grand_total = useGrandTotal(totalSpentByCategory);

  const last3TransactionsMap = useLastTransactionsMap(transactionsData!);

  const availableCategories = useAvailableCategories(
    transactionsData!,
    budgetsData
  );

  const editableCategories = useEditableCategories(
    transactionsData!,
    budgetsData,
    selectedBudget!
  );

  const initialData = useInitialBudgetData(selectedBudget!);

  return (
    <section id="Budgets">
      {isOpen && (
        <Modal
          isOpen={true}
          title={
            mode == "Delete" ? "‘" + selectedBudget!.category + "’?" : "Budget"
          }
          mode={mode!}
          categories={
            mode === "Add"
              ? availableCategories
              : mode === "Edit"
              ? editableCategories
              : undefined
          }
          initialData={
            mode === "Edit" && selectedBudget ? initialData : undefined
          }
          onClose={close}
          onSubmit={async (data) => {
            if (mode === "Add") {
              const result = await addBudget(data);
              if (result && setBudgetsData)
                setBudgetsData((prev) => [...prev, ...result]);
            }

            if (mode === "Edit" && selectedBudget) {
              const result = await updateBudget(selectedBudget.id, data);
              if (result && setBudgetsData)
                setBudgetsData((prev) =>
                  prev.map((b) =>
                    b.id === selectedBudget.id ? { ...b, ...result[0] } : b
                  )
                );
            }

            if (mode === "Delete" && selectedBudget && setBudgetsData) {
              await deleteBudget(selectedBudget.id);
              setBudgetsData((prev) =>
                prev.filter((b) => b.id !== selectedBudget.id)
              );
            }

            close();
          }}
        />
      )}
      <header>
        <h1>Budgets</h1>
        <button className="btn bg-black" id="Add_New-Budget" onClick={openAdd}>
          + Add New Budget
        </button>
      </header>
      <section>
        <div id="Summary">
          <div className="generic">
            {/* <PieChart budgets={budgetsData} grandT={grand_total} /> */}
            {/* <PieChartSvg budgets={budgetsData} grandT={grand_total} /> */}
            <BasicPie budgets={budgetsData} granT={grand_total} />
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
                  onEdit={() => openEdit(item)}
                  onDelete={() => openDelete(item)}
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
                category={item.category}
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
