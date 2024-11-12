import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        forums: [
            {
                id: 1,
                name: "Forum 1",
                topics: [
                    {
                        id: 1,
                        title: "Topic 1",
                        content: "Topic 1 - content"
                    }
                ],
                sub_forums: [
                    {
                        id: 2,
                        name: "Sub-Forum 1",
                        topics: [
                            {
                                id: 2,
                                title: "Topic 2",
                                content: "Topic 2 - content"
                            }
                        ]
                    }
                ]
            },
            {
                id: 3,
                name: "Forum 2",
                topics: [
                    {
                        id: 3,
                        title: "Topic 3",
                        content: "Topic 3 - content"
                    }
                ],
                sub_forums: [
                    {
                        id: 4,
                        name: "Sub-Forum 2",
                        topics: [
                            {
                                id: 4,
                                title: "Topic 2",
                                content: "Topic 2 - content"
                            }
                        ]
                    }
                ]
            },
        ]
    };
}) satisfies PageServerLoad;