import App from './App.jsx';

export default function page({ params  }) {
  const { slug } = params;
  return (
    <div>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>{slug}</h1>
      <App slug={slug} />
    </div>
  );
}
