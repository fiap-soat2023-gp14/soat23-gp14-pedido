import ProductDTO from 'src/core/application/dto/ProductDTO';
import { IProductGateway } from '../../../core/application/repositories/IProductGateway';
import axios from 'axios';

export default class ProductGateway implements IProductGateway {
  private clusterUrl: string;
  constructor() {
    this.clusterUrl = process.env.CLUSTER_URL;
  }

  public async getById(id: string, oauthToken: string): Promise<ProductDTO> {
    const headers = {
      Authorization: oauthToken,
    };
    console.log(' header: ', headers);
    try {
      const response = await axios.get(this.clusterUrl + '/products/' + id, {
        headers,
      });

      console.log('Status code:', response.status);
      if (response.status != 200) {
        return Promise.resolve(null);
      } else {
        console.log(response.data);
      }

      if (!response) return Promise.resolve(null);

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.resolve(null);
    }
  }
}
