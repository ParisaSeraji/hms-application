/// <reference types="Cypress" />
import React from "react";
import { PatientHistoryTable } from "./PatientHistoryTable";
import "../../../node_modules/tailwindcss/tailwind.css";

describe("Test for the PatientHistoryTable", () => {
    it("Renders", () => {
        cy.mount(<PatientHistoryTable />);
    });

    it("Shows the header of the table", () => {
        cy.mount(<PatientHistoryTable />);
        cy.get("[data-cy=PatientHistoryTable-table-headers").contains(
            "Date & Time"
        );
        cy.get("[data-cy=PatientHistoryTable-table-headers").contains("Doctor");
        cy.get("[data-cy=PatientHistoryTable-table-headers").contains("Clinic");
        cy.get("[data-cy=PatientHistoryTable-table-headers").contains(
            "Subject/Title"
        );
    });

    it("Shows a loading message to users if loading state is true", () => {
        cy.mount(<PatientHistoryTable isLoadingHistory={true} />);
        cy.get('[data-cy="PatientHistoryTable-loading-container"]').find(
            '[data-cy="PatientHistoryTable-loading-spinner"]'
        );
        cy.get('[data-cy="PatientHistoryTable-loading-container"]').find(
            '[data-cy="PatientHistoryTable-loading-text"]'
        );
    });

    it("Shows an error message and a clickable button that can perform an action", () => {
        const onRefresh = cy.spy().as("onRefresh");
        cy.mount(
            <PatientHistoryTable
                isLoadingHistory={false}
                errorLoadingHistory={true}
                refreshHandler={onRefresh}
            />
        );

        cy.get('[data-cy="PatientHistoryTable-error-container"]').find(
            '[data-cy="PatientHistoryTable-error-text"]'
        );
        cy.get('[data-cy="PatientHistoryTable-error-container"]').find(
            '[data-cy="PatientHistoryTable-refresh-button"]'
        );
        cy.get('[data-cy="PatientHistoryTable-refresh-button"]').click();
        cy.get("@onRefresh").should("have.been.called", 1);
    });

    it("Shows an all patient records when there is no error", () => {
        let dummydata = [
            {
                clinic: "Hope Medicals",
                dateTime: "12:00 pm 01/30/2023",
                doctor: "Dr. Michael Chris",
                subject: "SevereMigrains",
            },
            {
                clinic: "Children Smiles",
                dateTime: "12:00 pm 01/30/2023",
                doctor: "Dr. Timothy Patrick",
                subject: "Brain Tumors",
            },
            {
                clinic: "TMed Clinic",
                dateTime: "12:00 pm 01/30/2023",
                doctor: "Dr. Tyler Richard",
                subject: "Bad Kidney",
            },
            {
                clinic: "Bays Dentals",
                dateTime: "12:00 pm 01/30/2023",
                doctor: "Dr. Simeon Ray",
                subject: "Tiredness",
            },
        ];
        cy.mount(
            <PatientHistoryTable isLoadingHistory={false} history={dummydata} />
        );
        cy.get('[data-cy="PatientHistoryTable-record-field"]').should(
            "have.length",
            4
        );
    });
});
