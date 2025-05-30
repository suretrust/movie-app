export const MovieDetailsRow = ({
  value,
  name,
}: {
  value: string;
  name: string;
}) => {
  return (
    <p>
      {name}: <b>{value}</b>
    </p>
  );
};
