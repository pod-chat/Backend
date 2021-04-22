const request = require("supertest");
const db = require('../../database/dbConfig');
const server = require('../server');

const post1 = {
    post_title: 'Elon Musk',
    post_body: 'lorem ipsum',
    post_upvotes: 10,
    post_downvotes: 5,
    post_clip_start: '600',
    post_clip_end: '620',
    podcast_episode_id: '1',
    user_id: 1,
};

const post2 = {
    post_title: 'Jeff Bezos',
    post_body: 'asdfasddfdsafsdfs',
    post_upvotes: 20,
    post_downvotes: 4,
    post_clip_start: '600',
    post_clip_end: '620',
    podcast_episode_id: '2',
    user_id: 2,
}

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db("posts").truncate();
})

afterAll(async () => {
    await db.destroy();
})

describe("Posts Router Tests", () => {
    describe("[GET] /api/posts", () => {
        test("Responds with status 200, ok", async () => {
            const res = await request(server).get("/api/posts");
            expect(res.status).toEqual(200);
        })
        test("Returns with correct number of posts", async () => {
            let res;
            await db("posts").insert(post1);
            res = await request(server).get('/api/posts');
            expect(res.body).toHaveLength(1);
        })
    })
})