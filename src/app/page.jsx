import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Split the bill</h1>
        <p className="">Never forget again who paid what.</p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}
