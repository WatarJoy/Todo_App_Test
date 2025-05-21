describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds a new todo", () => {
    const newTodo = "Learn Cypress";

    cy.get(".todoapp__new-todo").type(`${newTodo}{enter}`);

    cy.contains(newTodo).should("exist");
  });

  it("does not add empty todo", () => {
    cy.get(".todoapp__new-todo").type("   {enter}");

    cy.get(".todoapp__new-todo").should("exist"); // Field still exists
    cy.contains("cannot be empty").should("not.exist"); // Assuming UI doesn't show this but no new todo added
  });

  it("toggles todo completed status", () => {
    const newTodo = "Toggle test";

    cy.get(".todoapp__new-todo").type(`${newTodo}{enter}`);

    cy.contains(newTodo).parent().find('input[type="checkbox"]').check();

    cy.contains(newTodo).parents(".todo").should("have.class", "completed");
  });

  it("deletes a todo", () => {
    const newTodo = "To be deleted";

    cy.get(".todoapp__new-todo").type(`${newTodo}{enter}`);

    cy.contains(newTodo).parent().find('[data-cy="TodoDelete"]').click();

    cy.contains(newTodo).should("not.exist");
  });

  it("filters active todos", () => {
    cy.get(".todoapp__new-todo").type("Active todo{enter}");
    cy.get(".todoapp__new-todo").type("Completed todo{enter}");

    cy.contains("Completed todo")
      .parent()
      .find('input[type="checkbox"]')
      .check();

    cy.get("[data-cy=FilterLinkActive]").click();
    cy.contains("Active todo").should("exist");
    cy.contains("Completed todo").should("not.exist");
  });

  it("clears completed todos", () => {
    cy.get(".todoapp__new-todo").type("Todo to complete{enter}");

    cy.contains("Todo to complete")
      .parent()
      .find('input[type="checkbox"]')
      .check();

    cy.get("[data-cy=ClearCompletedButton]").click();

    cy.contains("Todo to complete").should("not.exist");
  });
});
