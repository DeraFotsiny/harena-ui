import { Datagrid, TextField } from "react-admin";
import { Card, CardContent, CardHeader } from '@mui/material';

const PossessionList = () => {
  return (
    <Card>
      <CardHeader title="Possession List" />
      <CardContent>
        <Datagrid>
          <TextField source="type" label="Type" />
          <TextField source="argent.nom" label="Argent Name" />
          <TextField source="argent.valeur_comptable" label="Argent Value" />
          <TextField source="argent.devise.nom" label="Argent Currency Name" />
          <TextField source="argent.devise.code" label="Argent Currency Code" />
          <TextField source="argent.date_d_ouverture" label="Argent Opening Date" />
          <TextField source="argent.type" label="Argent Type" />
          <TextField source="materiel.nom" label="Materiel Name" />
          <TextField source="materiel.valeur_comptable" label="Materiel Value" />
          <TextField source="materiel.devise.nom" label="Materiel Currency Name" />
          <TextField source="materiel.devise.code" label="Materiel Currency Code" />
          <TextField source="materiel.date_d_acquisition" label="Materiel Acquisition Date" />
          <TextField source="materiel.taux_dappreciation_annuel" label="Materiel Annual Depreciation Rate" />
          <TextField source="flux_argent.nom" label="Flux Argent Name" />
          <TextField source="flux_argent.valeur_comptable" label="Flux Argent Value" />
          <TextField source="flux_argent.devise.nom" label="Flux Argent Currency Name" />
          <TextField source="flux_argent.devise.code" label="Flux Argent Currency Code" />
          <TextField source="flux_argent.argent.nom" label="Flux Argent - Argent Name" />
          <TextField source="flux_argent.argent.valeur_comptable" label="Flux Argent - Argent Value" />
          <TextField source="flux_argent.argent.devise.nom" label="Flux Argent - Argent Currency Name" />
          <TextField source="flux_argent.argent.devise.code" label="Flux Argent - Argent Currency Code" />
          <TextField source="flux_argent.argent.date_d_ouverture" label="Flux Argent - Argent Opening Date" />
          <TextField source="flux_argent.argent.type" label="Flux Argent - Argent Type" />
          <TextField source="flux_argent.debut" label="Flux Argent Start Date" />
          <TextField source="flux_argent.fin" label="Flux Argent End Date" />
          <TextField source="flux_argent.flux_mensuel" label="Flux Argent Monthly Flow" />
          <TextField source="flux_argent.date_d_operation" label="Flux Argent Operation Date" />
        </Datagrid>
      </CardContent>
    </Card>
  );
};

export default PossessionList;
