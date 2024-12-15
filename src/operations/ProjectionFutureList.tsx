import { List, Datagrid, TextField, DateField, NumberField, useRecordContext } from "react-admin";

const FluxArgentField = ({ record }: { record?: any }) => (
  <Datagrid>
    <DateField source="t" record={record} label="Date Flux" />
    <TextField source="nom" record={record} label="Nom Flux" />
    <NumberField
      source="valeur_comptable"
      record={record}
      label="Valeur Comptable Flux"
    />
    <TextField source="devise.nom" record={record} label="Nom Devise Flux" />
    <TextField source="devise.code" record={record} label="Code Devise Flux" />
    <DateField source="argent.t" record={record} label="Date Argent" />
    <TextField source="argent.nom" record={record} label="Nom Argent" />
    <NumberField
      source="argent.valeur_comptable"
      record={record}
      label="Valeur Comptable Argent"
    />
    <TextField
      source="argent.devise.nom"
      record={record}
      label="Nom Devise Argent"
    />
    <TextField
      source="argent.devise.code"
      record={record}
      label="Code Devise Argent"
    />
    <DateField
      source="argent.date_d_ouverture"
      record={record}
      label="Date d'Ouverture Argent"
    />
    <TextField source="argent.type" record={record} label="Type Argent" />
    <DateField source="debut" record={record} label="Début Flux" />
    <DateField source="fin" record={record} label="Fin Flux" />
    <NumberField source="flux_mensuel" record={record} label="Flux Mensuel" />
    <NumberField
      source="date_d_operation"
      record={record}
      label="Date d'Opération Flux"
    />
  </Datagrid>
);

const ProjectionFutureList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="nom_argent" label="Nom Argent" />
      <DateField source="date" label="Date" />
      <NumberField source="valeur_argent" label="Valeur Argent" />
      {useRecordContext && (
        useRecordContext()?.flux_argents &&
        useRecordContext()?.flux_argents.map((fluxArgent: any, index: number) => (
          <FluxArgentField key={index} record={fluxArgent} />
        ))
      )}
    </Datagrid>
  </List>
);

export default ProjectionFutureList;
