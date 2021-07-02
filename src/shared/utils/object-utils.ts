export class ObjectUtils {
  public static jsonOrString(data: string): any {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }
}