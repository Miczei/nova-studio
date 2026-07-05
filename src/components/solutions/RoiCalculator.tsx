"use client";

import { useState } from "react";
import type { SolutionsContent } from "@/i18n/solutions";
import type { Locale } from "@/i18n/config";

const WORK_WEEKS_PER_YEAR = 48;

export default function RoiCalculator({
  calc,
  locale,
}: {
  calc: SolutionsContent["calculator"];
  locale: Locale;
}) {
  const [hours, setHours] = useState(calc.defaultHours);
  const [cost, setCost] = useState(calc.defaultCost);

  const annualHours = hours * WORK_WEEKS_PER_YEAR;
  const annualMoney = annualHours * cost;
  const numberLocale = locale === "pl" ? "pl-PL" : "en-US";
  const currency = locale === "pl" ? "zł" : "PLN";

  return (
    <div className="sol__calc">
      <div className="sol__calcFields">
        <div className="sol__calcField">
          <label htmlFor="roiHours">
            {calc.hoursLabel}: <span className="sol__calcVal">{hours}</span>
          </label>
          <input
            id="roiHours"
            type="range"
            min={1}
            max={60}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
        </div>
        <div className="sol__calcField">
          <label htmlFor="roiCost">
            {calc.costLabel}: <span className="sol__calcVal">{cost} {currency}</span>
          </label>
          <input
            id="roiCost"
            type="range"
            min={20}
            max={250}
            step={5}
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="sol__calcOut">
        <div className="sol__calcLbl">{calc.outLabel}</div>
        <div className="sol__calcBig">
          {annualMoney.toLocaleString(numberLocale)} {currency}
        </div>
        <div className="sol__calcSub">
          {annualHours.toLocaleString(numberLocale)} {calc.hoursSuffix}
        </div>
        <p className="sol__calcNote">{calc.outNote}</p>
      </div>
    </div>
  );
}
