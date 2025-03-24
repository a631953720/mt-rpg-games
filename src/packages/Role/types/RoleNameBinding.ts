export interface RoleNameBinding {
  id: number | null;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  criticalRate: number;
  dodgeRate: number;
}
