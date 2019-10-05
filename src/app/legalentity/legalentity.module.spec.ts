import { LegalentityModule } from './legalentity.module';

describe('LegalentityModule', () => {
  let legalentityModule: LegalentityModule;

  beforeEach(() => {
    legalentityModule = new LegalentityModule();
  });

  it('should create an instance', () => {
    expect(legalentityModule).toBeTruthy();
  });
});
