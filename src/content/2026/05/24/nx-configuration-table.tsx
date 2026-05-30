const NX_CONFIGURATIONS = ["development", "staging", "production"] as const;

type NxConfiguration = (typeof NX_CONFIGURATIONS)[number];
type NxTarget = "serve" | "build";
type NodeEnv = "development" | "production";

type NxConfigurationRow = {
  configuration: NxConfiguration;
  command: `nx ${NxTarget} web`;
  targetConfiguration: `${NxTarget}:${NxConfiguration}`;
  mode: NxConfiguration;
  nodeEnv: NodeEnv;
};

const NX_CONFIGURATION_TABLE_COLUMNS = [
  { key: "configuration", label: "configuration" },
  { key: "command", label: "실행 명령" },
  { key: "targetConfiguration", label: "target:configuration" },
  { key: "mode", label: "MODE" },
  { key: "nodeEnv", label: "NODE_ENV" },
] as const satisfies readonly {
  key: keyof NxConfigurationRow;
  label: string;
}[];

const createNxConfigurationRows = ({
  target,
  nodeEnv,
}: {
  target: NxTarget;
  nodeEnv: NodeEnv;
}): NxConfigurationRow[] => {
  return NX_CONFIGURATIONS.map((configuration) => ({
    configuration,
    command: `nx ${target} web`,
    targetConfiguration: `${target}:${configuration}`,
    mode: configuration,
    nodeEnv,
  }));
};

export const NX_SERVE_CONFIGURATION_ROWS = createNxConfigurationRows({
  target: "serve",
  nodeEnv: "development",
});

export const NX_BUILD_CONFIGURATION_ROWS = createNxConfigurationRows({
  target: "build",
  nodeEnv: "production",
});

export const NxConfigurationTable = ({
  rows,
}: {
  rows: readonly NxConfigurationRow[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            {NX_CONFIGURATION_TABLE_COLUMNS.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.targetConfiguration}>
              {NX_CONFIGURATION_TABLE_COLUMNS.map(({ key }) => (
                <td key={key}>
                  <code>{row[key]}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
