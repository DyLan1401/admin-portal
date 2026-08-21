import session from "express-session";

class InMemorySessionStore extends session.Store {
    constructor() {
        super();

        this.sessions = new Map();
    }

    get(sessionId, callback) {
        const session = this.sessions.get(sessionId);

        callback(null, session || null);
    }

    set(sessionId, sessionData, callback) {
        this.sessions.set(sessionId, sessionData);
        callback(null);
    }

    destroy(sessionId, callback) {
        this.sessions.delete(sessionId);

        callback(null);
    }

    touch(sessionId, sessionData, callback) {
        const session = this.sessions.get(sessionId);

        if (session) {
            this.sessions.set(sessionId, {
                ...session,
                cookie: sessionData.cookie,
            });
        }

        callback(null);
    }
    setForTest(sessionId, sessionData) {
        this.sessions.set(sessionId, sessionData);
    }
}

export default InMemorySessionStore;