// import React from "react";
import ellipsis from "/images/icons/icon-ellipsis.svg";
import type { Total } from "../../utils/DataContext";
import { calcPercentage } from "../../utils/math";
import CardHeader from "../CardHeader";
import PopupMenu from "../PopUpMenu/PopupMenu";
import { ProgressBarPots } from "../progressBar/ProgressBar";

export default function PotsCards(props: Total) {
  return (
    <div className="cardinfo bg-white">
      <CardHeader {...props}>
        <PopupMenu
          icon={ellipsis}
          label="Pot"
          onEdit={() => props.onEdit?.()}
          onDelete={() => props.onDelete?.()}
        />
      </CardHeader>
      <div className="potCard-barPercent">
        <div className="potCard-info">
          <h4>Total Saved</h4>
          <h1>{"$" + props.total.toFixed(2)}</h1>
        </div>
        <ProgressBarPots
          theme={props.theme}
          total={props.total}
          target={props.target}
        />
        <div className="potCard-info">
          <h5>
            <strong>{calcPercentage(props.total, props.target) + "%"}</strong>
          </h5>
          <h5>Target of ${props.target}</h5>
        </div>
      </div>
      <div className="potCard-options">
        <button className="btn bg-grey">
          <strong>+ Add Money</strong>
        </button>
        <button className="btn bg-grey">
          <strong>Withdraw</strong>
        </button>
      </div>
    </div>
  );
}
