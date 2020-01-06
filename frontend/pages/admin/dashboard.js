import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";

import SecondaryLayout from "../../components/SecondaryLayout";
import ErrorLayout from "../../components/ErrorLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Dashboard({ authorized }) {
  if (!authorized) {
    return (
      <div>
        <ErrorLayout status="403" title="403" subTitle="Sorry, you are not authorized to access this page." />
      </div>
    );
  }

  return (
    <div>
      <SecondaryLayout title="Admin Dashboard">
        <div>Protected Area</div>
      </SecondaryLayout>
    </div>
  );
}

Dashboard.getInitialProps = async ctx => {
  const { access_token } = cookies(ctx);
  const r1 = await fetch(BASE_URL + "/admin/identity_check", {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const result = await r1.json();
  if (result.success) {
    return { authorized: true };
  }
  return { authorized: false };
};

export default Dashboard;
