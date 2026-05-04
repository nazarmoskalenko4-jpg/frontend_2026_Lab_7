import { useParams } from 'react-router-dom';

    export default function AdminInventoryDetails() {
      const { id } = useParams();
      return <h2>Деталі інвентарю #{id}</h2>;
    }