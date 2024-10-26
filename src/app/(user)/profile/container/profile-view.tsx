type Props = {
  user: TUser;
};

export default function ProfileView({ user }: Props) {
  return (
    <section>
      <h1>Profile Details</h1>
      <p>Name : {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Admin: {user.isAdmin}</p>
    </section>
  );
}
