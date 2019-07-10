export abstract class BaseConverter<M, D> {
  public abstract modelToDTO(model: M): D;

  public abstract DTOtoModel(dto: D): M;

  public modelToDTOList(models: M[]): D[] {
    let dtoList: D[] = [];

    models.forEach(m => {
      dtoList.push(this.modelToDTO(m));
    });

    return dtoList;
  }

  public DTOtoModelList(dto: D[]): M[] {
    let modelList: M[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }
}
