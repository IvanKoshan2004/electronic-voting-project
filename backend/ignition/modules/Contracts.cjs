const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ContractsModule = buildModule("ContractsModule", m => {
  const token = m.contract("ElectionFactory");
  return { token };
});

module.exports = ContractsModule;
