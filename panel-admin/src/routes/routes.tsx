export default [
    { path: "/", element: <Home /> },
    {
        path: "/panel", element: <Panel />, children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "users", element: <Users /> },
            { path: "profile", element: <Profile /> },
            { path: "list-expert", element: <ListExpert /> },
            { path: "information-expert", element: <InformationExpert /> },
            { path: "page-arzyab", element: <FormArzyab /> },
            { path: "show-madrak", element: <ShowMadrak /> },
            { path: "info-show-madrak", element: <InfoShowMadrak /> },
            { path: "logs", element: <PageLogs /> },
            { path: "eval", element: <PageEval /> },
            { path: "eval-information", element: <EvalInfo /> },
            { path: "update-expert", element: <UpdateFormExpert /> }
        ]
    },
    // { path: "/*", element: <NotFound /> },
]