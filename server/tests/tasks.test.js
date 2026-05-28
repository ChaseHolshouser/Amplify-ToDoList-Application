const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../server");

const DATA_FILE = path.join(__dirname, "../tasks.json");

beforeEach(() => {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
});

test("GET /api/tasks returns an empty task list", async () => {
  const response = await request(app).get("/api/tasks");

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

test("POST /api/tasks creates a new task", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ text: "Finish assignment" });

  expect(response.statusCode).toBe(201);
  expect(response.body.text).toBe("Finish assignment");
  expect(response.body.completed).toBe(false);
  expect(response.body.id).toBeDefined();
});

test("POST /api/tasks rejects empty input", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ text: "" });

  expect(response.statusCode).toBe(400);
  expect(response.body.error).toBeDefined();
});

test("PATCH /api/tasks/:id toggles task completion", async () => {
  const createResponse = await request(app)
    .post("/api/tasks")
    .send({ text: "Test toggle" });

  const taskId = createResponse.body.id;

  const updateResponse = await request(app)
    .patch(`/api/tasks/${taskId}`);

  expect(updateResponse.statusCode).toBe(200);
  expect(updateResponse.body.completed).toBe(true);
});

test("DELETE /api/tasks/:id deletes a task", async () => {
  const createResponse = await request(app)
    .post("/api/tasks")
    .send({ text: "Task to delete" });

  const taskId = createResponse.body.id;

  const deleteResponse = await request(app)
    .delete(`/api/tasks/${taskId}`);

  expect(deleteResponse.statusCode).toBe(200);

  const getResponse = await request(app).get("/api/tasks");
  expect(getResponse.body).toEqual([]);
});

test("DELETE /api/tasks/completed clears completed tasks", async () => {
  const taskOne = await request(app)
    .post("/api/tasks")
    .send({ text: "Completed task" });

  await request(app).post("/api/tasks").send({ text: "Active task" });

  await request(app).patch(`/api/tasks/${taskOne.body.id}`);

  const clearResponse = await request(app)
    .delete("/api/tasks/completed");

  expect(clearResponse.statusCode).toBe(200);

  const getResponse = await request(app).get("/api/tasks");

  expect(getResponse.body.length).toBe(1);
  expect(getResponse.body[0].text).toBe("Active task");
});